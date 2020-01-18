const diatonic = (parameters, callback) => {
  const utils = require('../utils');
  try {
    const Key = require('tonal-key');

    if (parameters.scaleroot && parameters.scalename) {
      const scaleroot = utils.adjustRootName(parameters.scaleroot);
      const scalename = utils.changeToEn(parameters.scalename);
      if (parameters.diatonic) {
        const dia = utils.changeToEn(parameters.diatonic);
        let diatonicChords;
        if (dia === 'triad') {
          diatonicChords = Key.triads(`${scaleroot} ${scalename}`);
        } else if (dia === 'tetrad') {
          diatonicChords = Key.chords(`${scaleroot} ${scalename}`);
        }

        if (diatonicChords) {
          const diatonicText = utils.buildChordTextFromList(diatonicChords);
          console.log(`${scaleroot}${parameters.scalename}のダイアトニックは、${diatonicText}です。`);
          callback(null, utils.build_callback_data(`${scaleroot}${parameters.scalename}のダイアトニックは、${diatonicText}です。`));
        } else {
          throw new Error('diatonic chords is empty.');
        }
      } else {
        throw new Error('diatonic parameter is empty.');
      }
    } else {
      throw new Error('scaleroot or scalename parameter is empty.');
    }
  } catch(error) {
    console.log(error);
    callback(null, utils.build_callback_data(`よく聞き取れませんでした。もう一度お願いします。`));
  }
};

module.exports = diatonic;
