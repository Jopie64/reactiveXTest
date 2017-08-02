import { Observable, Subject, BehaviorSubject } from 'rxjs/rx';

export function trueIn3Seconds_Promise(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    });

    return promise;
}

export function trueIn3Seconds_Observable(): Promise<boolean> {
    const promiseLikeObservable = Observable.create((observer) => {
        setTimeout(() => {
            observer.next(true);
            observer.complete();
        }, 3000);
    });

    return promiseLikeObservable.toPromise();
}

export function produce2468(): Promise<number[]> {
    const num = [1,2,3,4];
    return Observable
        .from(num)
        .map(x => x * 2)
        .toArray()
        .toPromise();
}

// Java stream equivalent
/*
public class TestJava8 {
    public static void main(String[] args) {
        List<Integer> num = Arrays.asList(1,2,3,4,5);
        List<Integer> collect1 = num
            .stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println(collect1); //[2, 4, 6, 8, 10]
    }
}
*/

export function printNewValue():Promise<boolean>
{
    const value = new BehaviorSubject<number>(1);
    value
        .subscribe(newValue => {
                console.log('Value changed to '+ newValue);
            });
    value.next(3);
    // Output: Value changed to 3
    return value.asObservable().take(1).map(x => x === 3).toPromise();
}

/*
void printNewValue()
{
    JSignal::CValueWithChangeNotification<int> value(1);

    value
        .AddHandler([] (const JSignal::CValueWithChangeNotification<int>::T_Event& e)
        {
            cout << "Value changed to " << e.m_New << endl;
        });

    value = 3;
    // Output: Value changed to 1
    // Output: Value changed to 3
}
*/