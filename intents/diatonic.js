const diatonic = (parameters, callback) => {
  const utils = require('../utils');
  try {
    if (parameters.scaleroot && parameters.scalename) {
      const scaleroot = utils.reduceRootName(parameters.scaleroot);
      if (!utils.isContainsRootNote(scaleroot)) {
        throw new Error('scaleroot is invalid.');
      }
      const scalename = utils.changeToEn(parameters.scalename);
      if (parameters.diatonic) {
        const numOfNotes = utils.changeToEn(parameters.diatonic);
        const diatonicChords = utils.createDiatonicList(scaleroot, scalename, numOfNotes);

        if (diatonicChords) {
          const chordData = utils.enharmonizeChords(diatonicChords);
          if (parameters.number) {
            const diatonicFromNum = chordData[parameters.number - 1 % 8];
            const text = utils.buildTextFromNote(diatonicFromNum);
            console.log(`${scaleroot}${parameters.scalename}の${parameters.number}個目のダイアトニックは、${text}です。`);
            callback(null, utils.build_callback_data(`${scaleroot}${parameters.scalename}の${parameters.number}個目のダイアトニックは、${text}です。`));
          } else {
            const text = utils.buildChordTextFromList(utils.enharmonizeChords(diatonicChords));
            const numOfNotesText = numOfNotes === 'triad' ? 'ダイアトニック' : '4和音ダイアトニック';
            console.log(`${scaleroot}${parameters.scalename}の${numOfNotesText}は、${text}です。`);
            callback(null, utils.build_callback_data(`${utils.rootNameToJp(scaleroot)}${parameters.scalename}の${numOfNotesText}は、${text}です。`));
          }
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
