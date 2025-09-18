export const unitDefinitions = {
  length: {
    label: '长度',
    base: 'meter',
    units: {
      millimeter: { label: '毫米 (mm)', ratio: 0.001 },
      centimeter: { label: '厘米 (cm)', ratio: 0.01 },
      meter: { label: '米 (m)', ratio: 1 },
      kilometer: { label: '千米 (km)', ratio: 1000 },
      inch: { label: '英寸 (in)', ratio: 0.0254 },
      foot: { label: '英尺 (ft)', ratio: 0.3048 },
      yard: { label: '码 (yd)', ratio: 0.9144 },
      mile: { label: '英里 (mi)', ratio: 1609.34 },
    },
  },
  weight: {
    label: '重量',
    base: 'kilogram',
    units: {
      milligram: { label: '毫克 (mg)', ratio: 0.000001 },
      gram: { label: '克 (g)', ratio: 0.001 },
      kilogram: { label: '千克 (kg)', ratio: 1 },
      ton: { label: '吨 (t)', ratio: 1000 },
      pound: { label: '磅 (lb)', ratio: 0.453592 },
      ounce: { label: '盎司 (oz)', ratio: 0.0283495 },
    },
  },
  temperature: {
    label: '温度',
    base: 'celsius',
    units: {
      celsius: { label: '摄氏度 (°C)', toBase: (v) => v, fromBase: (v) => v },
      fahrenheit: {
        label: '华氏度 (°F)',
        toBase: (v) => (v - 32) / 1.8,
        fromBase: (v) => v * 1.8 + 32,
      },
      kelvin: { label: '开尔文 (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  volume: {
    label: '体积',
    base: 'liter',
    units: {
      milliliter: { label: '毫升 (mL)', ratio: 0.001 },
      liter: { label: '升 (L)', ratio: 1 },
      cubic_meter: { label: '立方米 (m³)', ratio: 1000 },
      gallon: { label: '加仑 (gal)', ratio: 3.78541 },
      pint: { label: '品脱 (pt)', ratio: 0.473176 },
    },
  },
  area: {
    label: '面积',
    base: 'square_meter',
    units: {
      square_centimeter: { label: '平方厘米 (cm²)', ratio: 0.0001 },
      square_meter: { label: '平方米 (m²)', ratio: 1 },
      square_kilometer: { label: '平方千米 (km²)', ratio: 1000000 },
      hectare: { label: '公顷 (ha)', ratio: 10000 },
      acre: { label: '英亩 (acre)', ratio: 4046.86 },
    },
  },
}

export const staticRates = {
  CNY: { label: '人民币 (CNY)', rate: 1 },
  USD: { label: '美元 (USD)', rate: 0.14 },
  EUR: { label: '欧元 (EUR)', rate: 0.13 },
  JPY: { label: '日元 (JPY)', rate: 20.3 },
  GBP: { label: '英镑 (GBP)', rate: 0.11 },
  AUD: { label: '澳元 (AUD)', rate: 0.21 },
  CAD: { label: '加元 (CAD)', rate: 0.19 },
  HKD: { label: '港币 (HKD)', rate: 1.09 },
}

export const loremPresets = {
  short: 2,
  medium: 4,
  long: 6,
}
