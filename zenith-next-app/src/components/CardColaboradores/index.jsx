import { ButtonUser } from "../Button"
import ImgColaborador from "../../../public/assets/Icons/ImgCard.svg"
export const CardColaboradores = () => {
    return (
        <div className="bg-mainColors-secundaryWhite rounded-2xl w-[270px] h-[280px] items-center flex flex-col">
            <ButtonUser
                img={ImgColaborador}
                styles={"w-[110px] h-[110px]"}
            />
            <div>
                <h1>oi</h1>
                <h2>tudo bem</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    )
}