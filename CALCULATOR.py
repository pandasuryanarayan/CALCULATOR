def add(x,y):

    return(x+y)

def sub(x,y):

    return(x-y)

def multiply(x,y):

    return(x*y)

def divide(x,y):

    return(x/y)

def cm1(x):

    return(x/100)

def m1(x):

    return(x*100)

def cm2(x):

    return(x/100000)

def m2(x):

    return(x/1000)

def mm(x):

    return(x/10)

def cm3(x):

    return(x*10)

def hr1(x):

    return(x*3600)

def sec(x):

    return(x/3600)

def hr2(x):

    return(x*60)

def min(x):

    return(x/60)

def bytes(x):

    return(x*8)

def bits(x):

    return(x/8)

def kb(x):

    return(x*1024)

def mb(x):

    return(x*1024)

def gb(x):

    return(x*1024)

def bytes1(x):

    return(x/1024)

def kb1(x):

    return(x/1024)

def mb1(x):

    return(x/1024)

def sqm(x):

    return(x*10000)

def sqcm(x):

    return(x/10000)

def l(x):

    return(x*1000)

def ml(x):

    return(x/1000)

def cum(x):

    return(x*1000000)

def cucm(x):

    return(x/1000000)

def kg(x):

    return(x*1000)

def g(x):

    return(x/1000)

def ton(x):

    return(x*1000)

def kg1(x):

    return(x/1000)

def c(x):

    return(x+273.15)

def k(x):

    return(x-273.15)

def c1(x):

    return((x*9/5)+32)

def f(x):

    return((x-32)*5/9)

def f1(x):

    return((x-32)*5/9+273.15)

def k1(x):

    return((x-273.15)*9/5+32)

print("CALCULATOR")

print("-----------------------")

print("Basic Calculator")

print("\nSelect Operation: ")

print("1.Addition\n2.Subtraction")

print("3.Multiplication\n4.Division")

print("\nUnit Converter 🔄")

print("\nSelect Operation:\n")

print("Length\n5.CM to M\n6.M to CM")

print("7.CM to KM\n8.M to KM")

print("9.MM to CM\n10.CM to MM\n")

print("Time \n11.Hr to Sec\n12.Sec to Hr")

print("13.Hr to Min\n14.Min to Hr\n")

print("Data\n15.Bytes to Bits\n16.Bits to Bytes\n17.KB to bytes\n18.MB to KB")

print("19.GB to MB\n20.Bytes to KB")

print("21.KB to MB\n22.MB to GB\n")

print("Area\n23.Square meters to Square centimeters\n24.Square centimeters to Square meters\n")

print("Volume\n25.Litres to Milliliters\n26.Milliliters to Liters")

print("27.Cubic meters to Cubic Centimeters\n28.Cubic centimeters to Cubic meters\n\nMass\n29.kg to g\n30.g to kg")

print("31.Tons to kg\n32.kg to Tons\n")

print("\nTemperature\n33.Celsius to Kelvin\n34.Kelvin to Celsius")

print("35.Celsius to Fahrenheit\n36.Farenheit to Celsius")

print("37.Farenheit to Kelvin\n38.Kelvin to Fahrenheit\n")

while True:

  choice=int(input("Enter a choice(1 to 38): "))

  if choice in (1,2,3,4):

    n1=float(input("Enter 1st Number: "))

    n2=float(input("Enter 2nd Number: "))

    k=add(n1,n2)

    j=sub(n1,n2)

    l=multiply(n1,n2)

    p=divide(n1,n2)

    if choice==1:

      print("Addition:\n",n1,"+",n2,"=",k)

    elif choice==2:

      print("Subtraction:\n",n1,"-",n2,"=",j)

    elif choice==3:

      print("Multiplication:\n",n1,"X",n2,"=",l)

    elif choice==4:

      print("Division:\n",n1,"÷",n2,"=",p)

    next_calculation=input("Continue?\nEnter(Y)/(N):")

    if next_calculation in ('N','n'):

      break

  elif choice in (5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38):

      if choice==5:

          n3=float(input("Enter CM Value: "))

          print("M of ",n3," is ",cm1(n3))

      elif choice==6:

          n4=float(input("Enter M value: "))

          print("CM of ",n4," is ",m1(n4))

      elif choice==7:

          n5=float(input("Enter CM Value: "))

          print("KM of ",n5," is ",cm2(n5))

      elif choice==8:

          n6=float(input("Enter M Value: "))

          print("KM of ",n6," is ",m2(n6))

      elif choice==9:

          n7=float(input("Enter MM Value: "))

          print("CM of ",n7," is ",mm(n7))

      elif choice==10:

          n8=float(input("Enter CM Value: "))

          print("MM of ",n8," is ",cm3(n8))

      elif choice==11:

          n9=float(input("Enter Hour Value: "))

          print(n9,"Hr =",hr1(n9),"Sec")

      elif choice==12:

          n10=float(input("Enter Sec Value: "))

          print(n10,"Sec =",sec(n10),"Hr")

      elif choice==13:

          n11=float(input("Enter Hour Value: "))

          print(n11,"Hr =",hr2(n11),"Min")

      elif choice==14:

          n12=float(input("Enter Min Value: "))

          print(n12,"Min =",min(n12),"Hr")

      elif choice==15:

          n13=float(input("Enter Bytes Value: "))

          print(n13,"Bytes =",bytes(n13),"bits")

      elif choice==16:

          n14=float(input("Enter Bits Value: "))

          print(n14,"bits =",bits(n14),"bytes")

      elif choice==17:

          n15=float(input("Enter Kilobytes Value: "))

          print(n15,"KB =",kb(n15), "bytes")

      elif choice==18:

          n16=float(input("Enter Megabytes Value: "))

          print(n16,"MB =",mb(n16),"KB")

      elif choice==19:

          n17=float(input("Enter Gigabytes Value: "))

          print(n17,"GB =",gb(n17),"MB")

      elif choice==20:

          n18=float(input("Enter Bytes Value: "))

          print(n18,"bytes =",bytes1(n18),"KB")

      elif choice==21:

          n19=float(input("Enter Kilobytes Value: "))

          print(n19,"KB =",kb1(n19),"MB")

      elif choice==22:

          n20=float(input("Enter Megabytes Value: "))

          print(n20,"MB =",mb1(n20),"GB")

      elif choice==23:

          n21=float(input("Enter Square Meters Value: "))

          print(n21,"m² =",sqm(n21),"cm²")

      elif choice==24:

          n22=float(input("Enter Square centimeters Value: "))

          print(n22,"cm² =",sqcm(n22), "m²")

      elif choice==25:

          n22=float(input("Enter Liters Values: "))

          print(n22," l =",l(n22),"ml")

      elif choice==26:

          n23=float(input("Enter Milliliters Value: "))

          print(n23,"ml",ml(n23),"l")

      elif choice==27:

          n24=float(input("Enter Cubic meters Value: "))

          print(n24,"cu m =",cum(n24),"cc")

      elif choice==28:

          n25=float(input("Enter Cubic Centimeters Value: "))

          print(n25,"cc =",cucm(n25),"cu m")

      elif choice==29:

          n26=float(input("Enter Kilogram Value: "))

          print(n26,"kg =",kg(n26),"g")

      elif choice==30:

          n27=float(input("Enter Gram Value: "))

          print(n27,"g =",g(n27),"kg")

      elif choice==31:

          n28=float(input("Enter Ton Value: "))

          print(n28,"ton =",ton(n28),"kg")

      elif choice==32:

          n29=float(input("Enter KG Value: "))

          print(n29,"kg =",kg1(n29),"ton")

      elif choice==33:

          n30=float(input("Enter Celsius Value: "))

          print(n30,"°C =",c(n30),"°K")

      elif choice==34:

          n31=float(input("Enter Kelvin Value: "))

          print(n31,"°K =",k(n31),"°C")

      elif choice==35:

          n32=float(input("Enter Celsius Value: "))

          print(n32,"°C =",c1(n32),"°F")

      elif choice==36:

          n33=float(input("Enter Fahrenheit Value: "))

          print(n33,"°F =",f(n33),"°C")

      elif choice==37:

          n34=float(input("Enter Fahrenheit Value: "))

          print(n34,"°F =",f1(n34),"°K")

      elif choice==38:

          n35=float(input("Enter Kelvin Value: "))

          print(n35,"°K =",k1(n35),"°F")

      next_calculation=input("Continue?\nEnter(Y)/(N):")

      if next_calculation in ('N','n'):

        break

  else:

      print("Invalid Input !!!")

      break
