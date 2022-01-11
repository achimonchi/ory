

const InputFields = ({label, type, value, isAutoComplete, onChange, disabled}) => {
    return (
        <section id="input-fields" className="mb-2">
            <label htmlFor="">{label ?? "label"}</label>
            <input disabled={disabled} value={value} onChange={onChange} autoComplete={isAutoComplete} className="border border-gray-300 w-full rounded px-2 py-2 mt-2" placeholder={label} type={type ?? "text"} />
        </section>
    )
}

module.exports = {InputFields}