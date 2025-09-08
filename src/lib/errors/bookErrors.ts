export class DuplicateBookError extends Error {
    constructor(message = 'この本はすでに本棚に登録されています') {
        super(message);
        this.name = "DuplicateBookError";
    }
}

export class DataBaseError extends Error {
    constructor(message = 'データベースに接続できませんでした') {
        super(message);
        this.name = "DataBaseError";
    }
}