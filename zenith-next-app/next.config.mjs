/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'blobvitalhubg16enzo.blob.core.windows.net',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
