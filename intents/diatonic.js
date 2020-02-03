const Note = require('@tonaljs/note');
const Key = require('tonal-key');
const utils = require('../utils');

const diatonic = (parameters, callback) => {
  try {
    if (parameters.scaleroot && parameters.scalename) {
      const scaleroot = utils.reduceRootName(parameters.scaleroot);
      if (!utils.isContainsRootNote(scaleroot)) {
        throw new Error('scaleroot is invalid.');
      }
      const scalename = utils.changeToEn(parameters.scalename);
      const triadChords = createDiatonicList(scaleroot, scalename, 'triad');
      const tetradChords = createDiatonicList(scaleroot, scalename, 'tetrad');

      if (triadChords && tetradChords) {
        const triadChordData = utils.enharmonizeChords(triadChords);
        const tetradChordData = utils.enharmonizeChords(tetradChords);
        const triadSpeechText = utils.buildChordSpeechTextFromList(triadChordData);
        const tetradSpeechText = utils.buildChordSpeechTextFromList(tetradChordData);
        const triadDisplayText = triadChordData.join('、');
        const tetradDisplayText = tetradChordData.join('、');
        callback(null,
          {
            "payload": {
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": `${utils.buildTextFromNote(scaleroot)}${parameters.scalename}の3和音のダイアトニックは、${triadSpeechText}です。\n${scaleroot}${parameters.scalename}の4和音のダイアトニックは、${tetradSpeechText}です。\n\n別のスケールを調べたい時は「ダイアトニック」もしくは音名を話してください。スケールの構成音を調べたい時は「スケール」と話しかけて下さい。`,
                        "displayText": `${scaleroot}${parameters.scalename}の3和音のダイアトニックは、${triadDisplayText}です。\n${scaleroot}${parameters.scalename}の4和音のダイアトニックは、${tetradDisplayText}です。\n\n別のスケールを調べたい時は「ダイアトニック」もしくは音名を話してください。スケールの構成音を調べたい時は「スケール」と話しかけて下さい。`,
                      }
                    }
                  ],
                  "suggestions": [
                    {
                      "title": "スケール"
                    },
                    {
                      "title": "ダイアトニック"
                    },
                  ],
                }
              }
            }
          }
        );
      } else {
        throw new Error('triadChords or tetradChords is empty.');
      }
    } else {
      throw new Error('scaleroot or scalename parameter is empty.');
    }
  } catch(error) {
    console.log(error);
    callback(null, utils.build_callback_data(`よく聞き取れませんでした。もう一度お願いします。`));
  }
};

const createDiatonicList = (scaleroot, scalename, numOfNotes) => {
  if (scalename === 'melodic minor' || scalename === 'harmonic minor') {
    const type = scalename.replace(' minor', '');
    const scaleList = this.harmonicOrMelodicScaleList(scaleroot, scalename);

    let chordNameList;
    if (type === 'harmonic') {
      if (numOfNotes === 'triad') {
        chordNameList = ['m', 'dim', 'aug', 'm', 'M', 'M', 'dim'];
      } else if (numOfNotes === 'tetrad') {
        chordNameList = ['mM7', 'm7b5', 'aug7', 'm7', '7', 'M7', 'dim7'];
      }
    } else if (type === 'melodic') {
      if (numOfNotes === 'triad') {
        chordNameList = ["m", "m", "aug", "M", "M", "dim", "dim"];
      } else if (numOfNotes === 'tetrad') {
        chordNameList = ["m6", "m7", "aug7", "7", "7", "m7b5", "m7b5"];
      }
    }
    return scaleList.map(root => {
      const _root = Note.simplify(root);
      return `${_root}${chordNameList[scaleList.indexOf(root)]}`;
    });
  } else {
    if (numOfNotes === 'triad') {
      return Key.triads(`${scaleroot} ${scalename}`);
    } else if (numOfNotes === 'tetrad') {
      return Key.chords(`${scaleroot} ${scalename}`);
    }
  }
};

module.exports = diatonic;
