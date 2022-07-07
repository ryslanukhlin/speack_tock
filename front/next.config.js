/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    /*
        поставил на false, так как при входе на сайт по определенному uri,
        из за этого свойства, отменяеться подписка
    */
    reactStrictMode: false,
};

module.exports = nextConfig;
