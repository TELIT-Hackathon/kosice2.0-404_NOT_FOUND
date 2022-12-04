const Voucher = ({voucher}) => {

    console.log(voucher)

    const value = voucher?.value
    const name = voucher?.name
    const price = voucher?.price
    const image = voucher?.image
    const backgroundColor = voucher?.backgroundColor

    return(
        <>
            <div className="voucher-wrapper" style={{backgroundColor: backgroundColor}}>
                <div className="voucher-upper">
                    <div className="voucher-info">
                        <div className="value">{value}</div>
                        <div className="name">{name}</div>
                    </div>

                    <div className="image-wrapper" style={{backgroundColor: "white"}}><img alt="company-img" className="company-img" src={image}/></div>

                </div>

                <p className="balance">{price}</p>

            </div>
        </>
    )
}

export default Voucher