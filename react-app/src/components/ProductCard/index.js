export default function ProductCard({product}) {
return(
    <>
        <div>{product.name}</div>
        <div>
            <img src={product.image} />
        </div>
    </>
)
}
