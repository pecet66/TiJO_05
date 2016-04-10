describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        it('should return tuple: vowels and palindrome boolean', function() {
            expect(app.generateMessage("asdffdsa")).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage("jlflj")).toEqual({vowel: 0, palindrome: true});
            expect(app.generateMessage("asdfghjkl")).toEqual({vowel: 1, palindrome: false});
        });
        it('should throw error when text is empty', function() {
            expect( function(){ app.generateMessage("");} ).toThrowError(Error, 'Empty string!');
        });
    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function (){
                spyOn(app, 'isPalindrome');
                app.isPalindrome('ala');
            });
            it('should call isPalindrome function', function() {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('ala');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage('asdffdsa');
            });
            it('should be called through generateMessage function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('asdffdsa');
            });
        });

        describe('and.returnValue', function () {
            var palindrome;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call isPalindrome and return true', function () {
                palindrome = app.isPalindrome("asdffdsa");
                expect(palindrome).toBe(true);
            });
            it('should call generateMessage and isPalindrome should return true', function () {
                palindrome = app.generateMessage("asdffdsa");
                expect(palindrome).toEqual({vowel: 2, palindrome: true});
            });
        });

        describe('and.callFake', function () {
            var pal;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function (str) {
                    var strTemp = str.toLowerCase(),
                        strLength = strTemp.length;
                    if (str === '') {
                        return true;
                    }
                    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
                    for (var i = 0; i < halfLength; i++) {
                        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
                            return true;
                        }
                    }
                    return false;
                });
            });
            it('should call isPalindrome fake function', function () {
                pal = app.isPalindrome("asdfdsa");
                expect(pal).toBe(false);
            });
            it('should call generateMessage and isPalindrome fake function', function () {
                pal = app.generateMessage("asdffdsa");
                expect(pal).toEqual({vowel: 2, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var pal;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should notice that call isPalindrome is call', function () {
                pal = app.isPalindrome("asdffdsa");
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice that isPalindrome is call when generateMessage is call', function () {
                pal = app.generateMessage("asdffdsa");
                expect(app.isPalindrome.calls.count()).toEqual(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount');
                app.vowelCount("asdffdsa");
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith("asdffdsa");
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
                app.generateMessage("poiuuiop");
            });
            it('should call vowelCount function when generateMessage is call', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith("poiuuiop");
            });
        });

        describe('and.returnValue', function () {
            var wynik;
            beforeAll(function (){
                spyOn(app, 'isPalindrome').and.returnValue(false);
            });
            it('should call isPalindrome function and return false', function() {
                wynik = app.isPalindrome('anna');
                expect(wynik).toBe(false);
            });
            it('should call generateMessage and isPalindrome functions, result should be equal false', function() {
                wynik = app.generateMessage('anna');
                expect(wynik).toEqual({vowel: 2, palindrome: false});
            });
        });

        describe('and.callFake', function () {
            var pal;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function (str) {
                    var strTemp = str.toLowerCase(),
                        strLength = strTemp.length;
                    if (str === '') {
                        return true;
                    }
                    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
                    for (var i = 0; i < halfLength; i++) {
                        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
                            return true;
                        }
                    }
                    return false;
                });
            });
            it('should call isPalindrome fake function', function () {
                pal = app.isPalindrome("mam");
                expect(pal).toBe(false);
            });
            it('should call generateMessage and isPalindrome fake function', function () {
                pal = app.generateMessage("mam");
                expect(pal).toEqual({vowel: 1, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var vow;
            beforeAll(function () {
                spyOn(app,'vowelCount').and.callThrough();
            });
            it('should notice that call vowelCount is call',function () {
                vow=app.vowelCount("asdffdsa");
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount is call when generateMessage is call',function () {
                vow=app.generateMessage("asdffdsa");
                expect(app.vowelCount.calls.count()).toEqual(2);
            });
        });
    });

});
