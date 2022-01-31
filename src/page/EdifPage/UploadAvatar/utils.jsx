
export async function mockUpload(file) {
    return {
        url: URL.createObjectURL(file),
    }
}

export async function mockUploadFail() {
    throw new Error('Fail to upload')
}