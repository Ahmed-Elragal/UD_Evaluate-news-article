 const PolarityModes ={
    "P+": "strong positive",
    "P": "positive",
    "NEU": "neutral",
    "N": "negative",
    "N+": "strong negative",
    "NONE": "without polarity",
}

export function polarityReturn  (mode) {
    // console.log(`mode ${mode} includes ${Object.keys(PolarityModes).includes(mode)}`);
   
    return Object.keys(PolarityModes).includes(mode.toUpperCase())
        ?  PolarityModes[mode] :  mode
}