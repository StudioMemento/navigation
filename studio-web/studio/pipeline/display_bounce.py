"""Exhibition lighting for the outside of the architectural cutaway only.

These large cards are explicitly not additional fixtures inside the real studio.
They reveal the cut stone under the floor and the outer charcoal walls when the
visitor crosses the horizon or orbits behind the shell. All light is baked.
"""
import bpy
from mathutils import Vector


def add_display_bounce(shell):
    receivers=bpy.data.collections.new('Exhibition / shell receiver');receivers.objects.link(shell)
    cards=[('Stone underside',(-.65,-1.8,-2.65),(.16,.46,1),5.2,3.6,185,(.85,.89,1)),
           ('Rear exterior',(.75,5.7,2.4),(-.12,-1,-.15),3.7,1.8,58,(1,.82,.68)),
           ('Side exterior',(-5.45,.2,2.55),(1,.13,-.25),3.2,1.8,61,(.81,.9,1))]
    result=[]
    for name,p,d,w,h,power,color in cards:
        data=bpy.data.lights.new('Exhibition / '+name,'AREA');data.shape='RECTANGLE';data.size=w;data.size_y=h;data.energy=power;data.color=color
        lamp=bpy.data.objects.new(data.name,data);bpy.context.collection.objects.link(lamp);lamp.location=p;lamp.rotation_euler=Vector(d).to_track_quat('-Z','Y').to_euler()
        lamp.light_linking.receiver_collection=receivers
        result.append({'name':name,'scope':'exterior architectural shell','type':'rectangular area','position_m':p,'direction':d,'size_m':[w,h],'power_W':power,'linear_RGB':color})
    bpy.context.view_layer.update();return result
