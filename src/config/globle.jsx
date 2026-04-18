import { message } from "antd";

// generate Random Id Globally
window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
// generate Email Validation Globally
window.isValidEmail = (email) => /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);
// generate toastify Globally
window.toastify = (msg, type) => message[type](msg);

