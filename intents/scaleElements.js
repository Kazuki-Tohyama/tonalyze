const utils = require('../utils');
const Note = require('@tonaljs/note');
const { mode } = require('@tonaljs/mode');
const { transpose } = require('@tonaljs/tonal');
const { minorKey } = require('@tonaljs/key');

const scaleElements = (parameters, callback) => {
  try {
    if (parameters.scaleroot && parameters.scalename) {
      const scaleroot = utils.reduceRootName(parameters.scaleroot);
      if (!utils.isContainsRootNote(scaleroot)) {
        throw new Error('scaleroot is invalid.');
      }
      const scalename = utils.changeToEn(parameters.scalename);
      const scalemode = createScaleList(scaleroot, scalename);

      const scaleSpeechText = buildSpeechTextFromList(scalemode);
      const scaleDisplayText = buildDisplayTextFromList(scalemode);
      callback(null,
        {
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": `${scaleroot}${parameters.scalename}の構成音は、${scaleSpeechText}です。`,
                      "displayText": `${scaleroot}${parameters.scalename}の構成音は、${scaleDisplayText}です。`,
                    }
                  }
                ]
              }
            }
          }
        }
      );
    } else {
      throw new Error('scaleroot or scalename parameter is empty.');
    }
  } catch(error) {
    console.log(error);
    callback(null, utils.build_callback_data(`よく聞き取れませんでした。もう一度お願いします。`));
  }
};

const createScaleList = (scaleroot, scalename) => {
  if (scalename === 'melodic minor' || scalename === 'harmonic minor') {
    const type = scalename.replace(' minor', '');
    return minorKey(scaleroot)[type].scale;
  }
  return mode(scalename).intervals.map(interval => transpose(scaleroot, interval));
};

const buildSpeechTextFromList = (list) => {
  const enharmonizedList = enharmonize(list);
  const listToJp = enharmonizedList.map(elm => {
    if (elm.includes('#')) {
      return elm.replace('#', 'シャープ');
    } else if (elm.includes('b')) {
      return elm.replace('b', 'フラット');
    }
    return elm;
  });
  return listToJp.join('、');
};

const buildDisplayTextFromList = (list) => {
  return enharmonize(list).join('、');
};

const enharmonize = (list) => {
  const enharmonicableNotes = ['B#', 'E#', 'Fb', 'Cb'];
  return list.map(elm => {
    let note = Note.simplify(elm);

    if (enharmonicableNotes.includes(note)) {
      note = Note.enharmonic(note);
    }
    return note;
  });
};

module.exports = scaleElements;
