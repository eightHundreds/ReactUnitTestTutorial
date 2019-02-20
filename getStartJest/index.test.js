import { sum } from './index'
describe('sum', () => {
    test('当调用参数是1和2时返回3', () => {
        expect(sum(1, 2)).toBe(3);
    })
    test('当调用参数是"1"和2时报错',()=>{
        expect(()=>{
            sum("1",2)
        }).toThrow();
    })
})
