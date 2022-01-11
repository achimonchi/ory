

export default function ErrorForm({message}){
    return (
        <div className={`error-msg text-sm bg-red-200 p-2 rounded-lg mb-3 ${
            message === ""
                ? " hidden"
                : " flex"
        }`}>
            <p>{message}</p>
        </div>
    )
}