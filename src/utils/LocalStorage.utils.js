export const setJWT = (token) => {
    localStorage.setItem('JWT_KEY', JSON.stringify(token));
};

export const getToken = () => {
    return localStorage.getItem('JWT_KEY');
};

export const deleteToken = () => {
    localStorage.removeItem('JWT_KEY');
};