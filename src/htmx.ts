enum method {
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type HxRequestContext = {
    path: string,
    method: method,
    target: HTMLElement
}


const hxTriggerElement = (ele: HTMLElement): void => {
    const hxContext = extractHxRequestContext(ele);
    if (hxContext.path === undefined) {
        return;
    }

}

const hxRequest = (requestContext: HxRequestContext, payload: Map<String, any>): void => {

}

const extractHxRequestContext = (target: HTMLElement): HxRequestContext => {

}

const init = (): void => {
    const body = document.querySelector('body') as HTMLElement;
    body.addEventListener('click', (evt) => {
        hxTriggerElement(evt.target as HTMLElement);
    });
}

export default {hxTriggerElement, hxRequest, init};
