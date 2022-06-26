import { FC, ReactNode, useEffect, useState } from "react"

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {

    const [background, setBackground] = useState({});

    useEffect(() => {
        const getRandomInt = (min: number, max: number) => {
            return min + Math.floor(Math.random() * (max - min))
        }

        const bgStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/f${getRandomInt(1, 10)}.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }

        setBackground(bgStyle);

    }, [])


    return (<div style={background} className="p-2 flex flex-row justify-center">
        <div className="max-w-lg">
            {children}
        </div>
    </div>)
}

export default Wrapper;