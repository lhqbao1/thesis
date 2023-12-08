import { Skeleton } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { callGetNotifications } from "../../../services/api"
import './Notification.scss'
const Notification = (props) => {
    const { getNotification } = props
    const [reload, setReload] = useState(false)
    const [dataNotification, setDataNotification] = useState([])
    const student = useSelector(state => state?.student?.user)
    const lecturer = useSelector(state => state?.lecturer?.user?.items)
    useEffect(() => {
        const GetNotifications = async () => {
            const res = await callGetNotifications()
            if (res) {
                let data = res.data.payload.items
                data.map(item => {
                    item.start = (new Date(+item.start)).toLocaleDateString()
                    item.end = (new Date(+item.end)).toLocaleDateString()
                })
                setDataNotification(res.data.payload.items)
            }
        }
        GetNotifications()
    }, [reload])

    const getNotificationData = (data) => {
        getNotification(data)
    }

    return (
        <div>
            {lecturer || student ?
                <ul className="notiUl" style={{ listTypeStyle: 'arrow' }}>
                    {dataNotification.map(item => {
                        return (
                            <li className="notiItem" onClick={() => getNotificationData(item)}>{item?.name}</li>
                        )
                    })}

                </ul>
                :
                <Skeleton active />
            }


        </div>
    )
}

export default Notification