const HALLTYPE={
    CHEM_LAB:'chemistry lab',
    REGULAR:'regular',
    COMP_LAB:'computer lab',
    BIO_LAB:'biology lab'
}
const halls=[
    {
    id:"SF1",
    key:"SF1",
    location:"Near SF2",
    type: HALLTYPE.REGULAR
}, {
    id:"SF3",
    key:"SF2",
    location:"Near SF3",
    type: HALLTYPE.BIO_LAB
}, {
    id:"SF2",
    key:"SF3",
    location:"Near SF3",
    type: HALLTYPE.COMP_LAB
},
]

export default halls;