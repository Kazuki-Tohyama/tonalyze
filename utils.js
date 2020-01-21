const Note = require('@tonaljs/note');
const { minorKey } = require('@tonaljs/key');
const Key = require('tonal-key');

const utils = {
  build_callback_data: (message) => {
    const json = {
      fulfillmentText: message,
    };
    return json;
  },
  isContainsRootNote: (root) => {
    const noteNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return noteNames.find(el => root.includes(el));
  },
  changeToEn: (name) => {
    if (name === 'メジャー' || name === 'イオニアン') {
      return 'major';
    }
    if (name === 'マイナー') {
      return 'minor';
    }
    if (name === 'エオリアン') {
      return 'aeolian';
    }
    if (name === 'リディアン') {
      return 'lydian';
    }
    if (name === 'ロクリアン') {
      return 'locrian';
    }
    if (name === 'ミクソリディアン') {
      return 'mixolydian';
    }
    if (name === 'フリジアン') {
      return 'phrygian';
    }
    if (name === 'ドリアン') {
      return 'dorian';
    }
    if (name === 'メロディックマイナー') {
      return 'melodic minor';
    }
    if (name === 'ハーモニックマイナー') {
      return 'harmonic minor';
    }
    if (name === 'トライアド') {
      return 'triad';
    }
    if (name === 'テトラッド') {
      return 'tetrad';
    }
    return name;
  },
  reduceRootName: (root) => {
    const adjustedRoot = root.reduce((acc, cur) => {
      return `${acc}${cur}`;
    });
    return adjustedRoot;
  },
  rootNameToJp: (root) => {
    let adjustedRoot = root;
    if (adjustedRoot.includes('#')) {
      return adjustedRoot.replace('#', 'シャープ');
    } else if (adjustedRoot.includes('b')) {
      return adjustedRoot.replace('b', 'フラット');
    }
    return adjustedRoot;
  },
  enharmonizeChords: (chordList) => {
    const enharmonicableNotes = ['B#', 'E#', 'Fb', 'Cb'];
    return chordList.map(chord => {
      const enharmonicNote = enharmonicableNotes.find(el => {return chord.indexOf(el) > 0;});
      if (enharmonicNote) {
        return chord.replace(enharmonicNote, Note.enharmonic(enharmonicNote));
      }
      return chord;
    });
  },
  buildTextFromList: (list) => {
    const enharmonicableNotes = ['B#', 'E#', 'Fb', 'Cb'];
    const listToJp = list.map(elm => {
      let note = Note.simplify(elm);

      if (enharmonicableNotes.includes(note)) {
        note = Note.enharmonic(note);
      }

      if (note.includes('#')) {
        return note.replace('#', 'シャープ');
      } else if (note.includes('b')) {
        return note.replace('b', 'フラット');
      }
      return note;
    });
    return listToJp.join('、');
  },
  buildChordTextFromList: (list) => {
    const listToJp = list.map(elm => {
      let chord = elm;
      chord = chord.replace('dim', 'ディミニッシュ');
      chord = chord.replace('aug', 'オーギュメント');
      chord = chord.replace('b', 'フラット');
      chord = chord.replace('#', 'シャープ');
      chord = chord.replace('Maj', 'メジャー');
      chord = chord.replace('M', 'メジャー');
      chord = chord.replace('m', 'マイナー');
      chord = chord.replace('5', 'ファイブ');
      chord = chord.replace('6', 'シックスス');
      chord = chord.replace('7', 'セブンス');
      chord = chord.replace('9', 'ナインス');
      chord = chord.replace('11', 'イレブンス');
      chord = chord.replace('13', 'サーティーンス');
      return chord;
    });
    return listToJp.join('、');
  },
  harmonicOrMelodicScaleList: (scaleroot, scalename) => {
    const type = scalename.replace(' minor', '');
    return minorKey(scaleroot)[type].scale;
  },
  createDiatonicList: (scaleroot, scalename, numOfNotes) => {
    if (scalename === 'melodic minor' || scalename === 'harmonic minor') {
      const type = scalename.replace(' minor', '');
      const scaleList = minorKey(scaleroot)[type].scale;
      
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
  },
};

module.exports = utils;
