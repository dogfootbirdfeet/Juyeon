import streamlit as st
import pandas as pd
#동 찾는 함수
def find(test, keyword):
    return any(k in test for k in keyword)

def main():
    st.title("부산 남구 병원 현황")
    df=pd.read_csv("/Users/my/Desktop/부산광역시 남구_의료기관 현황_20240115.csv",encoding="cp949")
    #동 찾기
    dong=['대연동','감만동','용당동','용호동','문현동']
    selectDong=st.multiselect("찾으시는 동을 선택하세요",dong)
    # 선택한 동을 포함하는 행만 필터링
    filtered_df = df[df['의료기관주소(도로명)'].apply(lambda x: find(x, selectDong))]
    
    if not selectDong:
        table=st.write(df)
    else:
        table=st.write(filtered_df)
        
    
if __name__=="__main__":
    main()
    
