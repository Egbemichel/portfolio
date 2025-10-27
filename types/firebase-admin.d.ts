// Minimal ambient declaration for firebase-admin to keep TypeScript quiet when package types are not installed
declare module 'firebase-admin' {
    const admin: any;
    export default admin;
}
