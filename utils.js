const Note = require('@tonaljs/note');

const utils = {
  build_callback_data: (message) => {
    const json = {
      fulfillmentText: message,
    };
    return json;
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
  adjustRootName : (root) => {
    if (root.indexOf('シャープ') > 0) {
      return `${root.charAt(0)}#`;
    }
    if (root.indexOf('フラット') > 0) {
      return `${root.charAt(0)}b`;
    }
    return root;
  },
  buildTextFromList: (list) => {
    const listToJp = list.map(elm => {
      const simplifiedNote = Note.simplify(elm);
      if (simplifiedNote.indexOf('#') > 0 ) {
        return simplifiedNote.replace('#', 'シャープ');
      } else if (simplifiedNote.indexOf('b') > 0) {
        return simplifiedNote.replace('b', 'フラット');
      }
      return simplifiedNote;
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
};

module.exports = utils;
