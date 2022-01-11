

export default function Layout({children}){
    return (
        <section id="layout" className="bg-gray-100 h-full">
            <div className="layout max-w-screen-xl mx-auto p-0 md:p-4 mt-4 px-4">
                {children}
            </div>
        </section>
    )
}