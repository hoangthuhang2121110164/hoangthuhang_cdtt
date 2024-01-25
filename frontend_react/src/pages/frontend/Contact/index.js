// import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { HiMail } from "react-icons/hi";
import ContactServices from '../../../services/ContactServices';
import { Navigate } from 'react-router-dom';
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = new FormData();
        contact.append("name", name);
        contact.append("email", email);
        contact.append("phone", phone);
        contact.append("title", title);
        contact.append("content", setContent);
        (async () => {
            const result = await ContactServices.store(contact);
            alert(result.message);
            Navigate("/admin/contact", { replace: true });
        })();
    };
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await ContactServices.index();
            setContacts(result.contacts);
        })()
    }, []);
    return (
        <div className="container">
            <div className="row p-2">
                <div className="fs-4 col-md-7">
                    <div className="mb-2">
                        <h3>LIÊN HỆ</h3>
                        <hr width="50%"></hr>
                        <h5><FaPhoneAlt />Hotline</h5>
                        <small>0921989072</small>
                        <h5><HiMail />Email</h5>
                        <small>cosmetics.studio@gmail.com</small>
                    </div>
                    <h4>ĐỊA CHỈ TRỤ SỞ</h4>
                    <h6><FaMapMarkerAlt />Add:QQWM+7JR, JAMILA Khang Điền, p, Quận 9, Thành phố Hồ Chí Minh, Việt Nam</h6>
                    <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.
                    203175492461!2d106.78143517422288!3d10.795745258838728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.
                    1!3m3!1m2!1s0x3175272c90a91111%3A0x9e9c42f083fa7baf!2sUNNI%20Cosmetcis!5e0!3m2!1svi!2s!
                    4v1685267246993!5m2!1svi!2s"
                            width="500" height="450" style={{ border: 0 }} ></iframe>
                    </div>
                </div>
                <div className="col-md-5">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control border border-info" placeholder="Họ tên của bạn" />
                        </div>
                        <div className="form-group mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border border-info" placeholder="Email của bạn" />
                        </div>
                        <div className="form-group mb-3">
                            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control border border-info" placeholder="Số điện thoại của bạn" />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control border border-info" placeholder="Tiêu đề" />
                        </div>
                        <div className="mb-3">
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-control border border-info" id="exampleFormControlTextarea1" rows="8" placeholder="Nhập bình luận" />
                        </div>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-primary">Gửi liên hệ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Contact;