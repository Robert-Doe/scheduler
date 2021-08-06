import React, {useRef} from 'react'

export function PairWithJson() {
    const pairWithJsonHandler = (e) => {

    }

    const fileRef = useRef(null);

    return (
        <section className={'container'}>
            <fieldset>
                <legend>Add Department Pair By Json</legend>

                <form onSubmit={pairWithJsonHandler}>
                    <input type="file" ref={fileRef}/>
                </form>
            </fieldset>
        </section>
    )
}
