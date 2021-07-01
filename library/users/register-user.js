import mainAxios from '../axios/main-axios';

export const registerUser = async (user) => {
  const registerUserPost = async () => {
    const registerUrl = '/Authentication/Register';
    const post = await mainAxios.post(registerUrl, user);
    return post;
  };

  return await registerUserPost();
};
