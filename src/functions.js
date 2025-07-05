export const get_inverse_dict = (dict) => {
    let dict_inverse = {}
    Object.entries(dict).forEach(([key, value]) => {
      dict_inverse[value] = key
    })
    return dict_inverse
  }