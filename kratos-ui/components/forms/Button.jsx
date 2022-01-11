

const ButtonPrimary = ({className, text}) => {
    const newClassName = "bg-blue-500 text-white p-2 "+className
    return (
        <Button
            className={newClassName}
            text={text}
        />
    )
}

const Button=({className, text})=>{
    return (
        <button className={className}>
            {text}
        </button>
    )
}

module.exports={ButtonPrimary}