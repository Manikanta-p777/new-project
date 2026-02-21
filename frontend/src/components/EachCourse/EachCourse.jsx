import { Link } from "react-router-dom"

const EachCourse = props => {
    const { courseDetails } = props
    const { id, title, description, image_url, button_text, button_link } = courseDetails

    return (
        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[350px] bg-slate-800 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300 overflow-hidden">
            <div className="w-full aspect-video p-3">
                <img
                    src={image_url}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="p-5">
                <h2 className="font-sans text-lg font-semibold mb-2">{title}</h2>
                <p className="mb-4 text-sm text-slate-300 leading-relaxed">{description}</p>
                <Link to={button_link}>
                    <button
                        type="button"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
                    >
                        {button_text}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default EachCourse