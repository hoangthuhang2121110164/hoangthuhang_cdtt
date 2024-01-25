import httpAxios from "../httpAxios";

const ContactServices = {
    index: () => {
        return httpAxios.get("contact/index");
    },
    show: (id) => {
        return httpAxios.get(`contact/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`contact/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`contact/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`contact/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`contact/status/${id}`);
    },

};

export default ContactServices;

