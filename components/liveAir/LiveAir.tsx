import AllChannelsBox from "./AllChannelsBox"

const LiveAir = () => {

    return (
        <section className="container my-8 mx-auto w-[95%] lg-w-[80%]">
            <div className="grid grid-cols-3 gap-4">
                <div className="mx-auto col-span-1 w-[80%]">
                    <AllChannelsBox />
                </div>
                <div className="mx-auto  col-span-2"> screen  </div>
            </div>
        </section>
    )
}

export default LiveAir