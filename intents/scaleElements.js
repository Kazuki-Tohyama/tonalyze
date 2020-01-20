const scaleElements = (parameters, callback) => {
  const utils = require('../utils');
  const { mode } = require('@tonaljs/mode');
  const { transpose } = require('@tonaljs/tonal');
  try {
    if (parameters.scaleroot && parameters.scalename) {
      const scaleroot = utils.reduceRootName(parameters.scaleroot);
      if (!utils.isContainsRootNote(scaleroot)) {
        throw new Error('scaleroot is invalid.');
      }
      const scalename = utils.changeToEn(parameters.scalename);
      const isHamonicOrMelodicMinor = scalename === 'melodic minor' || scalename === 'harmonic minor';

      const scalemode = !isHamonicOrMelodicMinor
        ? mode(scalename).intervals.map(interval => transpose(scaleroot, interval))
        : utils.hamonicOrMelodicScale(scaleroot, scalename);

      const scaleText = utils.buildTextFromList(scalemode);

      console.log(`${scaleroot}${parameters.scalename}は、${scaleText}です。`);
      callback(null, utils.build_callback_data(`${utils.rootNameToJp(scaleroot)}${parameters.scalename}は、${scaleText}です。`));
    } else {
      throw new Error('scaleroot or scalename parameter is empty.');
    }
  } catch(error) {
    console.log(error);
    callback(null, utils.build_callback_data(`よく聞き取れませんでした。もう一度お願いします。`));
  }
};

module.exports = scaleElements;
