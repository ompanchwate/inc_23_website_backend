function judgesQueries(tableName) {
    const getJudge = (data) => {
        if (data.hasOwnProperty('email')) return `SELECT :columns FROM ${tableName} WHERE email = :email;`
        if (data.hasOwnProperty('username')) return `SELECT :columns FROM ${tableName} WHERE email = :username;`
        if (data.hasOwnProperty('phone')) return `SELECT :columns FROM ${tableName} WHERE phone = :phone;`
        if (data.hasOwnProperty('email') && data.hasOwnProperty('phone')) return `SELECT * FROM ${tableName} WHERE email = :email WHERE phone = :phone;`
        if (data.hasOwnProperty('jid')) return `SELECT :columns FROM ${tableName} WHERE jid = :jid;`
    }

    const getJudges = event_name => `CALL getJudges(${event_name})`

    const insertJudge = 'CALL insertJudge(:jid, :name, :email, :phone, :address, :company, :exp, :events, :domains, :slots, :min_projects, :referral, :password, :roles, :isPICT);'

    const loginJudge = 'CALL loginJudge(:username, :password);'

    return {
        getJudge,
        getJudges,
        insertJudge,
        loginJudge,
    }
}

export { judgesQueries }