from tkinter import Tk, ttk
from tkinter import *
from PIL import Image, ImageTk
from forex_python.converter import CurrencyRates, CurrencyCodes

import requests
import json

#colors 
cor0 = "#FFFFFF" # white
cor1 = "#333333" # black
cor2 = "#191970" # midnight blue

window = Tk()
window.geometry('300x320')
window.title('Forex Converter')
window.configure (bg=cor0)
window.resizable(height = False, width = False)

#frames
top = Frame(window, width=300, height=60, bg=cor0)
top.grid(row=0,column=0)

main = Frame(window, width=300, height=260, bg=cor0)
main.grid(row=1,column=0)

def convert():
    currency_rates = CurrencyRates()
    currency_codes = CurrencyCodes()

    currency_1 = combo1.get()
    currency_2 = combo2.get()
    amount = value.get()

    converted_amount = currency_rates.convert(currency_1, currency_2, float(amount))

    symbol = currency_codes.get_symbol(currency_2)

    formatted = f"{symbol} {converted_amount:.2f}"

    result['text'] = formatted


#top frame
icon = Image.open('images/icon.png')
icon = icon.resize((40,40))
icon = ImageTk.PhotoImage(icon)
app_name = Label(top, image = icon, compound=LEFT, text= "Foreign Exchange \nCurrency Converter", height=5, padx=20, pady=30, anchor=CENTER, font=('Arial 16 bold'), bg=cor2, fg=cor0)
app_name.place(x=0,y=0)

#main frame
result = Label(main, text= " ", width=16, height=2, pady=7, relief="solid", anchor=CENTER, font=('Ivy 15 bold'), bg=cor0, fg=cor1)
result.place(x=50, y=10)

currency = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'TRY', 'NOK', 'THB', 'USD', 'ZAR']

from_label = Label(main, text= "From", width=8, height=1, padx=0, pady=0, relief="flat", anchor=NW, font=('Ivy 10 bold'), bg=cor0, fg=cor1)
from_label.place(x=48, y=90)
combo1 = ttk.Combobox(main,width=8, justify=CENTER, font=("Ivy 12 bold"))
combo1['values'] = (currency)
combo1.place(x=50, y=115)

to_label = Label(main, text= "To", width=8, height=1, padx=0, pady=0, relief="flat", anchor=NW, font=('Ivy 10 bold'), bg=cor0, fg=cor1)
to_label.place(x=158, y=90)
combo2 = ttk.Combobox(main,width=8, justify=CENTER, font=("Ivy 12 bold"))
combo2['values'] = (currency)
combo2.place(x=160, y=115)

value = Entry(main, width=22, justify=CENTER, font=("Ivy 12 bold"), relief=SOLID)
value.place(x=50, y=155)

button = Button(main,text="Convert", width=19, height=1, padx=5, bg=cor2, fg=cor0, font=("Ivy 12 bold"), command=convert)
button.place(x=50, y=210)

window.mainloop()