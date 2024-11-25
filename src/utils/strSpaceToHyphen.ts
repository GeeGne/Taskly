function strSpaceToHyphen (str: string) {
  const strTrim = str.trim();
  const strSpaceTohyphen = strTrim.replace(/\s/g, '-');
  return strSpaceTohyphen;
}

export default strSpaceToHyphen;