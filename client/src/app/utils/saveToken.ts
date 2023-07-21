export const saveToken = (aToken: string, exp: number) => {
  const aTokenDate = new Date(0);
  aTokenDate.setUTCSeconds(exp);
  document.cookie = `aToken=${aToken}; expires=${aTokenDate}; path=/; SameSite=Lax; Secure`;
};

export const getAToken = () => {
  return document.cookie
    .split('; ')
    .find((c) => {
      return c.startsWith('aToken=');
    })
    ?.split('=')[1];
};

export const saveMainImgUrl = (imageUrl: string, exp: number) => {
  const expDate = new Date(0);
  expDate.setUTCSeconds(exp);

  document.cookie = `imgUrl=${imageUrl}; expires=${expDate}; path=/; SameSite=Lax; Secure`;
};

export const getMainImage = () => {
  return document.cookie
    .split('; ')
    .find((img) => {
      return img.startsWith('imgUrl=');
    })
    ?.split('=')[1];
};

export const removeMainImage = () => {
  document.cookie = `imgUrl=; max-age=0;`;
};

export const removeToken = () => {
  document.cookie = `aToken=; max-age=0`;
};
