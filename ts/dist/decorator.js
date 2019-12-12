var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function d(target, key) {
    console.log(target, key);
    if (target.__props) {
        target.__props = [];
    }
    target.__props.push(key);
}
class A {
}
__decorate([
    d
], A.prototype, "prop1", void 0);
__decorate([
    d
], A, "prop2", void 0);
console.log(A.prototype.__props);
