enum method {
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type HxRequestContext = {
    path: string|null,
    method: method,
    target: HTMLElement
}


const hxTriggerElement = (ele: HTMLElement): void => {
    const hxContext = extractHxRequestContext(ele);
    if (hxContext.path === "") {
        return;
    }
    if (!hxContext.path?.match("^/([^/]+|$)")) {
        throw new Error("Only requests using absolute paths to the current domain are supported.");
    }
    hxRequest(hxContext, new Map());
}

const hxRequest = (requestContext: HxRequestContext, payload: Map<String, any>): void => {

}

const extractHxRequestContext = (target: HTMLElement): HxRequestContext => {
    let reqPath = "";
    let reqMethod = method.GET;
    let reqTarget = target.parentElement ?? target;

    let pathFound = false;
    let targetFound = false;
    let currentElement : HTMLElement|null = target;
    while (currentElement !== null) {
        if (!targetFound && currentElement.hasAttribute('hx-target')) {
            const targetId = currentElement.getAttribute('hx-target') ?? "";
            reqTarget = document.querySelector(targetId) ?? target;
            targetFound = true;
        }

        currentElement = currentElement.parentElement;
    }

    return {
        path: reqPath,
        method: reqMethod,
        target: reqTarget
    }
}

const init = (): void => {
    const body = document.querySelector('body') as HTMLElement;
    body.addEventListener('click', (evt) => {
        hxTriggerElement(evt.target as HTMLElement);
    });
    console.log("htmx initialized");
}

export default {hxTriggerElement, hxRequest, init};
