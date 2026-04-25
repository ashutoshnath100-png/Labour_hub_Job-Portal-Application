import { useEffect, useState } from "react";

const LabourList = () => {
    const [labours, setLabours] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2003/api/labour")
            .then((res) => res.json())
            .then((data) => {
                setLabours(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h2>Labour List</h2>

            {labours.map((labour) => (
                <div key={labour._id}>
                    <p>Name: {labour.name}</p>
                    <p>skills: {labour.skill}</p>
                    <p>Phone: {labour.phone}</p>
                </div>
            ))}
        </div>
    );
};

export default LabourList;