
export function checkStudentLogined() {
    const token = window.localStorage.getItem('jwt-token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const person = JSON.parse(window.atob(base64));

    return person._type === 'student';
}

export function checkLecturerLogined() {
    const token = window.localStorage.getItem('jwt-token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const person = JSON.parse(window.atob(base64));

    return person._type === 'lecturer';
}

export function checkPartnerLogined() {
    const token = window.localStorage.getItem('jwt-token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const person = JSON.parse(window.atob(base64));

    return person._type === 'partner';
}

export function checkAdminLogined() {
    const token = window.localStorage.getItem('jwt-token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const person = JSON.parse(window.atob(base64));

    return person._type === 'admin';
}
