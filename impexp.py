'''    

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
 
engine = create_engine('sqlite:///home/fuzzy/Downloads/UserData.sqlite', echo=True)
Base = declarative_base(engine)
########################################################################
class Bookmarks(Base):
    """"""
    __tablename__ = 'ZPICMODEDICT'
    __table_args__ = {'autoload':True}
 
#----------------------------------------------------------------------
def loadSession():
    """"""
    metadata = Base.metadata
    Session = sessionmaker(bind=engine)
    session = Session()
    return session
 
if __name__ == "__main__":
    session = loadSession()
    res = session.query(Bookmarks).all()
    print res[1].Z_PK
    
    '''
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import mapper, sessionmaker
from flask.ext.sqlalchemy import SQLAlchemy
class Bookmarks(object):
    pass
 
#----------------------------------------------------------------------
def loadSession():
    """"""    
    dbPath = '/home/fuzzy/microblog/lsapp/static/userone/one/one.sqlite'
    engine = create_engine('sqlite:///%s' % dbPath, echo=False)
 
    metadata = MetaData(engine)
    moz_bookmarks = Table('ZPICMODEDICT', metadata, autoload=True)
    
    from sqlalchemy.sql import select
    import unicodedata
    s = select([moz_bookmarks])
    #conn = engine.connect()
    result = engine.connect().execute(s)
    jsonList=[]
    keyList=['Z_PK', 'Z_ENT', 'Z_OPT', 'ZEXTRACOLUMN1', 'ZIS_ENABLED', 'ZIS_SENTENCE_BOX_ENABLED', 'ZSERIAL', 'ZVERSION', 'ZAUDIO_DATA', 'ZCATEGORY_OR_TEMPLATE', 'ZCOLOR', 'ZEXTRACOLUMN2', 'ZIDENTIFIER', 'ZPARENT_ID', 'ZPART_OF_SPEECH', 'ZPICTURE', 'ZTAG_NAME']
    one=False
    for row in result:
        oneE={}
        for i,j in enumerate(keyList):
            oneE[j]=str(row[i]) if type(row[i])!=unicode else row[i]#unicodedata.normalize('NFKD', row[i]).encode('ascii','ignore')
        jsonList.append(oneE)
    import json
    with open('datajson.json', 'w') as outfile:
        json.dump(jsonList, outfile)
    jsondumps=json.dumps((jsonList))
    print jsondumps
    
 
if __name__ == "__main__":
    #session =
    loadSession()
    #res = session.query(Bookmarks).all()
    #e=Bookmarks()
    #members = [attr for attr in dir(Bookmarks()) if not callable(attr) and not attr.startswith("_")]
    #expr= 'res[0].'+members[0]