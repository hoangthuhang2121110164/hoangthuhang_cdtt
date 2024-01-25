import { Link } from "react-router-dom";
import TopicService from "../../services/TopicService";
import { useEffect, useState } from "react";
import './LayoutSiteStyle.css'

function ListTopic() {
    const [listTopic, setListTopic] = useState([]);
    useEffect(function () {
        (async function () {
            try {
                const result = await TopicService.getAll();
                setListTopic(result.data.topics);
            } catch (error) {
                console.error(error)
            }
        })();
    }, []);
    return (
        <div className="listtopic m-4">
            <h3 className="bg-info p-3 m-0 text-center">Chủ đề bài viết</h3>
            <ul>
                {listTopic.map(function (top, index) {
                    return (
                        <li key={index}>
                            <Link to={"/chu-de-bai-viet/" + top.slug}>{top.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ListTopic;