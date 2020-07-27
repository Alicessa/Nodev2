//导入模块
const fs = require('fs')
const path = require('path')
//基地址
const fileName = path.join(__dirname, './data/hero.json')
function getAllhero() {
    const heros = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
    return heros
}


module.exports = {
    //获取所有数据
    Herolist() {
        const heros = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        return heros
            .filter(v => !v.isDelete)
            .map(({ id, name, skill, icon }) => {
                return {
                    id,
                    name,
                    skill,
                    icon
                }
            })
    },
    //新增
    addHero({ name, skill, icon }) {
        let heros = getAllhero()
        heros.push({
            id: heros.length + 1,
            name,
            skill,
            icon,
            isDelete: false
        })
        //保存回去
        if (!fs.writeFileSync(fileName, JSON.stringify(heros))) {
            return true
        } else {
            return false
        }
    },
    //根据id获取数据
    Heroinfo(id) {
        const heros = this.Herolist()
        const filterArr = heros.filter(v => {
            return v.id == id
        })
        if (filterArr[0]) {
            return filterArr[0]
        } else {
            return false
        }

    },
    //根据id删除英雄(软删除)
    deleHeroById(id) {
        const heros = getAllhero()
        const filterArr = heros.filter(v => {
            return v.id == id
        })
        // console. log (filterArr) ;
        if (filterArr[0]) {
            filterArr[0].isDelete = true
            //保存回去
            if (!fs.writeFileSync(fileName, JSON.stringify(heros))) {
                return true
            }
            else {
                return false
            }
        } else {

            return false
        }
    },
    //编辑英雄
    updaHero({ id, name, skill, icon }) {
        let heros = getAllhero()
        const filterArr = heros.filter(v => {
            return v.id == id
        })
        // console.1og (filterArr) ;
        if (filterArr[0]) {
            filterArr[0].name = name
            filterArr[0].skill = skill
            filterArr[0].icon = icon
            //保存回去
            if (!fs.writeFileSync(fileName, JSON.stringify(heros))) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}