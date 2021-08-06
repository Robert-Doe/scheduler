export const refEmpty = (ref) => {
    return ref.current.value === ''
}

export const value = (ref) => ref.current.value

export const getCurrentId = (ref) => {
    let activeTags = []
    const currentNodes = ref.current.childNodes
    Object.keys(currentNodes).forEach(e => activeTags = [currentNodes[e], ...activeTags])
    return activeTags.find(node => node.value === value(ref)).dataset.id
}

export const acceptCSV = (e) => {
    if (e.target.files[0] !== undefined) {
        if (e.target.files[0].type !== "application/vnd.ms-excel") {
            e.target.parentNode.reset();
        } else {
            alert('File Accepted');
        }
        // console.log(e.target.files[0].type);
    }
}


