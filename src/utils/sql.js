const escapeString = (value) => String(value).replace(/'/g, "''")

const formatValue = (value) => {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  if (value instanceof Date) return `'${escapeString(value.toISOString())}'`
  return `'${escapeString(value)}'`
}

const formatIdentifier = (value) => value

const buildWhereFromArray = (conditions = []) => {
  const segments = []
  conditions.forEach((item, index) => {
    if (!item || !item.field) return
    const operator = (item.operator || '=').toUpperCase()
    const logical = index > 0 ? ` ${(item.logical || 'AND').toUpperCase()} ` : ''
    if (operator === 'IN' || operator === 'NOT IN') {
      const values = Array.isArray(item.value) ? item.value.map(formatValue).join(', ') : formatValue(item.value)
      segments.push(`${logical}${formatIdentifier(item.field)} ${operator} (${values})`)
      return
    }
    if (item.value === null && (operator === '=' || operator === 'IS')) {
      segments.push(`${logical}${formatIdentifier(item.field)} IS NULL`)
      return
    }
    if (item.value === null && (operator === '!=' || operator === '<>' || operator === 'IS NOT')) {
      segments.push(`${logical}${formatIdentifier(item.field)} IS NOT NULL`)
      return
    }
    segments.push(`${logical}${formatIdentifier(item.field)} ${operator} ${formatValue(item.value)}`)
  })
  return segments.join('')
}

const buildWhereFromObject = (where) => {
  if (!where || typeof where !== 'object') return ''
  if (Array.isArray(where)) return buildWhereFromArray(where)
  const segments = Object.entries(where).map(([field, descriptor]) => {
    if (descriptor && typeof descriptor === 'object' && !Array.isArray(descriptor)) {
      const operator = (descriptor.operator || '=').toUpperCase()
      if ((operator === 'IN' || operator === 'NOT IN') && Array.isArray(descriptor.value)) {
        const inValues = descriptor.value.map(formatValue).join(', ')
        return `${formatIdentifier(field)} ${operator} (${inValues})`
      }
      if (descriptor.value === null && (operator === '=' || operator === 'IS')) {
        return `${formatIdentifier(field)} IS NULL`
      }
      if (descriptor.value === null && (operator === '!=' || operator === '<>' || operator === 'IS NOT')) {
        return `${formatIdentifier(field)} IS NOT NULL`
      }
      return `${formatIdentifier(field)} ${operator} ${formatValue(descriptor.value)}`
    }
    if (Array.isArray(descriptor)) {
      const inValues = descriptor.map(formatValue).join(', ')
      return `${formatIdentifier(field)} IN (${inValues})`
    }
    return `${formatIdentifier(field)} = ${formatValue(descriptor)}`
  })
  return segments.join(' AND ')
}

const buildWhereClause = (where) => {
  const clause = Array.isArray(where) ? buildWhereFromArray(where) : buildWhereFromObject(where)
  return clause ? ` WHERE ${clause}` : ''
}

const buildOrderByClause = (orderBy) => {
  if (!orderBy) return ''
  if (Array.isArray(orderBy)) {
    const parts = orderBy
      .map((item) => {
        if (!item) return null
        if (typeof item === 'string') return `${formatIdentifier(item)}`
        if (item.field) {
          const direction = (item.direction || 'ASC').toUpperCase()
          return `${formatIdentifier(item.field)} ${direction}`
        }
        return null
      })
      .filter(Boolean)
    return parts.length ? ` ORDER BY ${parts.join(', ')}` : ''
  }
  if (typeof orderBy === 'object' && orderBy.field) {
    const direction = (orderBy.direction || 'ASC').toUpperCase()
    return ` ORDER BY ${formatIdentifier(orderBy.field)} ${direction}`
  }
  if (typeof orderBy === 'string') {
    return ` ORDER BY ${formatIdentifier(orderBy)}`
  }
  return ''
}

export function jsonToSql(jsonString, mode = 'select') {
  let data
  try {
    data = JSON.parse(jsonString)
  } catch (error) {
    throw new Error('JSON 解析失败，请检查输入格式')
  }

  const action = (mode || data.type || 'select').toLowerCase()
  const table = data.table
  if (!table) throw new Error('JSON 中缺少表名 (table)')

  if (action === 'select') {
    const columns = Array.isArray(data.columns) && data.columns.length ? data.columns.map(formatIdentifier).join(', ') : '*'
    const whereClause = buildWhereClause(data.where)
    const orderByClause = buildOrderByClause(data.orderBy)
    const groupByClause = Array.isArray(data.groupBy) && data.groupBy.length
      ? ` GROUP BY ${data.groupBy.map(formatIdentifier).join(', ')}`
      : ''
    const limitClause = data.limit ? ` LIMIT ${Number(data.limit)}` : ''
    const offsetClause = data.offset ? ` OFFSET ${Number(data.offset)}` : ''
    return `SELECT ${columns} FROM ${formatIdentifier(table)}${whereClause}${groupByClause}${orderByClause}${limitClause}${offsetClause};`
  }

  if (action === 'insert') {
    const values = Array.isArray(data.values) ? data.values : data.values ? [data.values] : []
    if (!values.length || typeof values[0] !== 'object') {
      throw new Error('INSERT 需要提供 values 字段，并包含至少一条记录')
    }
    const columns = Object.keys(values[0])
    const columnList = columns.map(formatIdentifier).join(', ')
    const valuesList = values
      .map((row) => `(${columns.map((column) => formatValue(row[column])).join(', ')})`)
      .join(', ')
    return `INSERT INTO ${formatIdentifier(table)} (${columnList}) VALUES ${valuesList};`
  }

  if (action === 'update') {
    const setData = data.set
    if (!setData || typeof setData !== 'object') {
      throw new Error('UPDATE 需要提供 set 字段，指定要更新的列')
    }
    const setClause = Object.entries(setData)
      .map(([key, value]) => `${formatIdentifier(key)} = ${formatValue(value)}`)
      .join(', ')
    const whereClause = buildWhereClause(data.where)
    if (!whereClause) {
      throw new Error('UPDATE 操作建议提供 WHERE 条件以避免全表更新')
    }
    return `UPDATE ${formatIdentifier(table)} SET ${setClause}${whereClause};`
  }

  if (action === 'delete') {
    const whereClause = buildWhereClause(data.where)
    if (!whereClause) {
      throw new Error('DELETE 操作必须提供 WHERE 条件以避免全表删除')
    }
    return `DELETE FROM ${formatIdentifier(table)}${whereClause};`
  }

  throw new Error(`暂不支持的操作类型：${action}`)
}

const normalizeSql = (sql) => sql.replace(/\s+/g, ' ').trim()

const parseSqlValue = (value) => {
  const trimmed = value.trim()
  if (/^null$/i.test(trimmed)) return null
  if (/^true$/i.test(trimmed)) return true
  if (/^false$/i.test(trimmed)) return false
  if (/^'.*'$/.test(trimmed)) return trimmed.slice(1, -1).replace(/''/g, "'")
  if (/^".*"$/.test(trimmed)) return trimmed.slice(1, -1)
  const num = Number(trimmed)
  if (!Number.isNaN(num)) return num
  return trimmed
}

const parseWhereClause = (clause) => {
  if (!clause) return []
  const parts = clause.split(/\s+(AND|OR)\s+/i)
  const conditions = []
  for (let i = 0; i < parts.length; i += 2) {
    const segment = parts[i]
    if (!segment) continue
    const logical = i === 0 ? null : parts[i - 1].toUpperCase()
    const match = segment.match(/([^\s]+)\s*(=|!=|<>|>=|<=|>|<|LIKE|NOT LIKE|IN|NOT IN|IS|IS NOT)\s*(.+)/i)
    if (!match) continue
    const [, field, opRaw, valueRaw] = match
    const operator = opRaw.toUpperCase()
    if (operator === 'IN' || operator === 'NOT IN') {
      const values = valueRaw.replace(/[()]/g, '').split(',').map(parseSqlValue)
      conditions.push({ field, operator, value: values, logical })
    } else if (operator === 'IS' || operator === 'IS NOT') {
      conditions.push({ field, operator, value: parseSqlValue(valueRaw), logical })
    } else {
      conditions.push({ field, operator, value: parseSqlValue(valueRaw), logical })
    }
  }
  return conditions
}

export function sqlToJson(sqlString) {
  if (!sqlString || !sqlString.trim()) {
    throw new Error('请先输入 SQL 语句')
  }
  const sql = normalizeSql(sqlString)
  const upper = sql.toUpperCase()

  if (upper.startsWith('SELECT')) {
    const match = sql.match(/select\s+(.+?)\s+from\s+([^\s]+)(.*)/i)
    if (!match) throw new Error('无法解析 SELECT 语句')
    const [, columnsRaw, table, tail = ''] = match
    const columns = columnsRaw.trim() === '*' ? ['*'] : columnsRaw.split(',').map((item) => item.trim())
    const whereMatch = tail.match(/where\s+(.+?)(order by|group by|limit|offset|$)/i)
    const orderMatch = tail.match(/order by\s+(.+?)(limit|offset|$)/i)
    const groupMatch = tail.match(/group by\s+(.+?)(order by|limit|offset|$)/i)
    const limitMatch = tail.match(/limit\s+(\d+)/i)
    const offsetMatch = tail.match(/offset\s+(\d+)/i)

    return {
      type: 'select',
      table,
      columns,
      where: whereMatch ? parseWhereClause(whereMatch[1]) : [],
      groupBy: groupMatch ? groupMatch[1].split(',').map((item) => item.trim()) : undefined,
      orderBy: orderMatch
        ? orderMatch[1].split(',').map((item) => {
            const [field, direction] = item.trim().split(/\s+/)
            return { field, direction: direction ? direction.toUpperCase() : 'ASC' }
          })
        : undefined,
      limit: limitMatch ? Number(limitMatch[1]) : undefined,
      offset: offsetMatch ? Number(offsetMatch[1]) : undefined,
    }
  }

  if (upper.startsWith('INSERT')) {
    const match = sql.match(/insert\s+into\s+([^\s]+)\s*\((.+?)\)\s*values\s*(.+);?/i)
    if (!match) throw new Error('无法解析 INSERT 语句')
    const [, table, columnsRaw, valuesRaw] = match
    const columns = columnsRaw.split(',').map((item) => item.trim())
    const rows = valuesRaw
      .split('),')
      .map((row) => row.replace(/[()]/g, '').trim())
      .map((row) => {
        const values = row.split(',').map((item) => parseSqlValue(item))
        const record = {}
        columns.forEach((column, index) => {
          record[column] = values[index]
        })
        return record
      })
    return {
      type: 'insert',
      table,
      columns,
      values: rows,
    }
  }

  if (upper.startsWith('UPDATE')) {
    const match = sql.match(/update\s+([^\s]+)\s+set\s+(.+?)(\s+where\s+(.+))?;?$/i)
    if (!match) throw new Error('无法解析 UPDATE 语句')
    const [, table, setPart, , wherePart] = match
    const setPairs = setPart.split(',').map((item) => item.trim())
    const set = {}
    setPairs.forEach((pair) => {
      const [field, value] = pair.split('=').map((item) => item.trim())
      set[field] = parseSqlValue(value)
    })
    return {
      type: 'update',
      table,
      set,
      where: wherePart ? parseWhereClause(wherePart) : [],
    }
  }

  if (upper.startsWith('DELETE')) {
    const match = sql.match(/delete\s+from\s+([^\s]+)(\s+where\s+(.+))?;?$/i)
    if (!match) throw new Error('无法解析 DELETE 语句')
    const [, table, , wherePart] = match
    if (!wherePart) {
      return {
        type: 'delete',
        table,
        where: [],
      }
    }
    return {
      type: 'delete',
      table,
      where: parseWhereClause(wherePart),
    }
  }

  throw new Error('暂不支持该类型的 SQL 语句解析')
}
