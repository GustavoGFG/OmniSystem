// FORMIK

export const defineFormikValues = async (key, value, reset, formiks) => {
  await formiks.setFieldValue(key, value);
  await formiks.setFieldTouched(key, reset);
};

export const resetFormikValues = formiks => {
  for (let key of Object.keys(formiks.values)) {
    if (key != 'date') {
      if (key == 'id') {
        defineFormikValues(key, 0, false, formiks);
      } else {
        defineFormikValues(key, '', false, formiks);
      }
    }
  }
};

// INPUT TRANSFORMS

export const transformFullName = full_name => {
  // Convert all letters to lowercase
  let lowercase = full_name.toLowerCase();

  // Capitalize the first letter of each word
  let capitalized = lowercase.replace(/(^|\s)\S/g, function (match) {
    return match.toUpperCase();
  });

  return capitalized;
};

export const transformCPF = cpf => {
  return cpf.replace(/\D/g, '');
};

export const transformCPFtoString = cpf => {
  const numericInput = cpf.replace(/\D/g, '');

  const formattedCPF = numericInput.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  );
  return formattedCPF;
};

export const capitalizeWords = wordArray => {
  wordArray = wordArray.toLowerCase().split(' ');
  let finalWord = '';
  for (let word of wordArray) {
    finalWord += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  }
  return finalWord.trim();
};

export const transformToCurrency = value => {
  return parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
export const transformToPercentage = (value, n) => {
  return (value * 100).toFixed(n) + '%';
};
export const transformToFloat = text => {
  // Replace all characters other than 0-9, ".", ",", and "-"
  const cleanedText = text.replace(/[^0-9.,]/g, '');

  // Replace "," with "."
  const commaReplaced = cleanedText.replace(/,/g, '.');

  // Remove all dots except the first one typed
  let dotReplaced = commaReplaced
    .replace(/(?<!\d)\.|^\.|-\./g, '')
    .replace(/(?<=\..*)\./g, '');

  const onlyTwoDecimals = dotReplaced.replace(/(\.\d\d)\d*/, '$1');
  // Ensure that the "-" remains at the beginning of the string if present
  let finalText = text.startsWith('-')
    ? '-' + onlyTwoDecimals
    : onlyTwoDecimals;

  return finalText;
};

export const transformToInteger = text => {
  const cleanedText = text.replace(/[^\d]/g, '');
  return cleanedText;
};
// SORTING ARRAYS

export const sortByKey = (data, key, ascendent) => {
  return [...data].sort((a, b) => {
    if (ascendent) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    } else {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    }
  });
};
